# TripAdverts DOOH Impression Algorithm (Prototype)

This document outlines the rules for the prototype impression counting algorithm used by the TripAdverts Analytics Engine. Designed specifically for the ride-share and taxi environment (displays mounted on the back of seat headrests), we use computer vision and face tracking to accurately measure true views and engagement. 

### The Ride-Share Environment Context
In this specific DOOH environment, viewers are a captive audience seated approximately **1.5 to 2.5 feet** away from the screen for extended periods (typically 10 to 30+ minutes). Because the user remains in the camera's field of view for the entire ride, our algorithms must account for continuous presence while still accurately measuring distinct moments of active engagement with the ad content as it rotates.

## Metrics Tracked
*   **Dwell Time:** The total duration a person is physically present within the camera's field of view.
*   **Attention Time:** The total duration a person actively maintains eye contact with the display.
*   **Verified Impression:** A logged event indicating an ad was delivered while a person was physically present in the camera's field of view (the opportunity to be seen).
*   **Unique Reach:** A count of the exact number of unique individual humans exposed to the ad, stripping out duplicate views from the same person.

## How We Calculate Impressions (Total Delivery)

An impression represents the **opportunity to be seen**. It is triggered simply by a person being within range of the camera while an ad is playing. Gaze validation is *not* required for an impression to be logged.

### Rule 1: The Trigger (Ad-Loop × People Present)
An impression is counted every time an ad is successfully served and is in a viewable state, multiplied by the number of people present.
*   When a new ad begins playing (or an existing ad loops), the system checks the camera feed.
*   For every face detected in the frame at that moment, an impression is immediately logged.
*   If a new person enters the frame *while* the ad is already playing, they also trigger an impression for that ad.

### Rule 2: The Look-Away Rule
Since impressions measure the *opportunity to be seen* during a specific ad playback, we do not double-count a person if they look away or momentarily step out of the camera's view during the *same* ad.
*   The AI uses **Spatial Consistency Tracking** to remember where faces are located during the current ad session.
*   If a viewer leaves the frame and returns (or drops off the AI tracking momentarily), the system recognizes them as the same person already counted for this specific ad playback, preventing duplicate impressions.

### Rule 3: The Loop Rule
When the current ad finishes and the playlist advances (or the same ad loops from the beginning), a new Ad Session begins.
*   The spatial tracking memory for impressions is wiped clean.
*   Any person sitting in the car is now considered a fresh viewer for this *new* serving of the ad.
*   This fulfills the formula: `Total Ad Plays × Number of Passengers = Total Impressions`.

---

## Measuring Engagement (Attention Time)

While impressions measure the opportunity, advertisers also want to know the quality of that opportunity. We measure this via **Attention Time**.

### The Activation Threshold
To log Attention Time, the system evaluates real-time continuous gaze. To prevent false positives from people quickly glancing as they walk quickly past, a user must maintain a valid, continuous gaze (looking directly at the screen within a **25-degree yaw** and 15-degree pitch) for at least **500 milliseconds**. 
*   Once this threshold is crossed, an active "Attention Session" begins, and Attention Time accumulates.

### The Drop-Off Tolerance
People naturally blink, look away momentarily due to distractions, or shift their weight. If the user breaks valid gaze during an active Impression Session, an invisible timer starts.
*   If the user re-establishes a valid gaze within **1500 milliseconds**, the interruption is forgiven, and the active Impression Session continues seamlessly.
*   If the Drop-Off Tolerance timer is exceeded, the active session terminates.

### Rule 4: The Spatial Consistency Rule (Unique Reach)
To measure true "Unique Reach," the system must distinguish between a new passenger entering the vehicle and the same passenger simply looking away for an extended period.
*   **Spatial Anchoring:** When a face is detected, the AI extracts its spatial coordinate (the center of the face, e.g., the tip of the nose) mapped to a normalized $(x, y)$ grid.
*   **The 15% Tolerance:** If a face disappears and reappears later, its new $(x, y)$ coordinate is compared against known historical locations for the current ride. If the distance is within **15% of the screen dimension**, the system assumes it is the *same captive passenger* shifting in their seat.
*   **Result:** A new Impression may be logged (based on the Cooldown Rule), but the **Unique Reach** counter does *not* increment. If a face appears in a genuinely new spatial quadrant beyond the 15% tolerance, the Reach counter increases.

---

## Why We Measure Impressions the Way We Do

When evaluating this system from a business or advertiser perspective, a few common questions arise about the accuracy and fairness of this methodology.

**Q: If there are 4 ads on the screen, does one person present count as 4 impressions? How is that fair to advertisers?**
**A:** We use a "Share of Voice" pricing model. When a user is present, *all four* active advertisers receive the impression metric because their brand was verifiably visible (the opportunity to be seen). However, advertisers are billed contextually based on their Share of Voice. The brand occupying the massive 'Main Feature' slot pays a premium multiplier for that impression, while the sidebar brands pay a fractional rate. This is the exact same transparent model used by traditional highway billboards displaying multiple logos, but exponentially more accurate because we guarantee eyes were on the glass.

**Q: Why not just use eye-tracking to see exactly which ad they are reading?**
**A:** True, pinpoint eye tracking (knowing exactly where on a screen a user is looking) requires user calibration (looking at dots on the screen to map the camera to their unique eye shape and corneal curvature). In a passive DOOH environment, calibration is impossible. Attempting to guess the exact gaze point on a tablet screen from several feet away using a standard webcam without calibration results in incredibly noisy, inaccurate data that would constantly misattribute impressions. Avoiding heavily granular retina-tracking also provides a stronger privacy stance.

**Q: If someone sits in the car for their entire 20-minute ride, does that generate unlimited impressions?**
**A:** No, it generates an exact, mathematically sound number of impressions. We use the **Ad-Loop** model. If a 15-second ad plays 80 times during a 20-minute ride, and one person is present, exactly 80 impressions are logged for that ad. This perfectly mirrors the real-world delivery of the creative content. Their *Attention Time* metric will also be massive (which commands a premium engagement metric for the campaign).

**Q: What if the environment is extremely crowded and multiple people glance at once?**
**A:** Our edge AI model is configured to process multiple faces simultaneously. The state machine (Threshold, Debounce, and Drop-Off rules) is tracked independently for *each unique face* in the frame. If five people are looking at the same time and all cross the 500ms threshold, that logs as exactly five verified impressions, accurately reflecting the crowd engagement.

**Q: What if someone is wearing a mask or dark sunglasses?**
**A:** The AI relies on identifying key facial landmarks to establish pose. Heavy obscuration (like dark sunglasses that hide the eyes completely) may prevent the system from validating a gaze. In these cases, the system errs on the side of caution and will *not* register an impression. This means our metrics provide a conservative, "guaranteed minimum" count of highly-engaged viewers, ensuring advertisers are never over-billed for ambiguous data.
