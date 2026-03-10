# TripAdverts DOOH Impression Algorithm (Prototype)

This document outlines the rules for the prototype impression counting algorithm used by the TripAdverts Analytics Engine. Designed specifically for the ride-share and taxi environment (displays mounted on the back of seat headrests), we use computer vision and face tracking to accurately measure true views and engagement. 

### The Ride-Share Environment Context
In this specific DOOH environment, viewers are a captive audience seated approximately **1.5 to 2.5 feet** away from the screen for extended periods (typically 10 to 30+ minutes). Because the user remains in the camera's field of view for the entire ride, our algorithms must account for continuous presence while still accurately measuring distinct moments of active engagement with the ad content as it rotates.

## Metrics Tracked
*   **Dwell Time:** The total duration a person is physically present within the camera's field of view.
*   **Attention Time:** The total duration a person actively maintains eye contact with the display.
*   **Verified Impression:** A logged event indicating a user met the criteria for having truly "seen" the advertisement.

## State Machine Rules

The engine uses a state machine to evaluate real-time continuous gaze data against these rules to log verified impressions:

### Rule 1: The Activation Threshold
To prevent false positives from people quickly glancing as they walk quickly past, a user must maintain a valid, continuous gaze (looking directly at the screen within a **25-degree yaw** and 15-degree pitch) for at least **500 milliseconds**. 
*   Once this threshold is crossed, an active "Impression Session" begins.
*   **Immediate Logging:** The Verified Impression is logged the exact moment this threshold is crossed, providing instant telemetry.

### Rule 2: The Time-Based Cooldown
Because our screens are mounted in vehicles, a typical passenger's Dwell Session (their physical presence in the back seat) lasts the entirety of their ride. A strict "one impression per ride" limit would fail to capture their engagement as the ad loop cycles.
*   Once a Verified Impression is logged for a specific user, that user enters a **Cooldown Period (e.g., 10 seconds)**.
*   During this cooldown, their *Attention Time* continues to accumulate (providing valuable telemetry on how long they watched the ad), but no new impressions can be logged.
*   After the cooldown expires, if the user looks away and then looks back at the screen (crossing the 500ms Activation Threshold again), a *new* Verified Impression is logged.
*   This ensures we accurately capture distinct moments of attention as the digital playlist rotates to new ads, without hyper-inflating the metrics simply because someone stared continuously for a long time.

### Rule 3: The Drop-Off Tolerance
People naturally blink, look away momentarily due to distractions, or shift their weight. If the user breaks valid gaze during an active Impression Session, an invisible timer starts.
*   If the user re-establishes a valid gaze within **1500 milliseconds**, the interruption is forgiven, and the active Impression Session continues seamlessly.
*   If the Drop-Off Tolerance timer is exceeded, the active session terminates.

---

## Why We Measure Impressions the Way We Do

When evaluating this system from a business or advertiser perspective, a few common questions arise about the accuracy and fairness of this methodology.

**Q: If there are 4 ads on the screen, does one glance count as 4 impressions? How is that fair to advertisers?**
**A:** We use a "Share of Voice" pricing model. Instead of invasively tracking exactly which 4-inch quadrant of the screen a user is staring at, we verify they are engaged with the digital canvas as a whole. When a user's gaze is verified, *all four* active advertisers receive the impression metric because their brand was verifiably visible during a confirmed attention event. However, advertisers are billed contextually based on their Share of Voice. The brand occupying the massive 'Main Feature' slot pays a premium multiplier for that impression, while the sidebar brands pay a fractional rate. This is the exact same transparent model used by traditional highway billboards displaying multiple logos, but exponentially more accurate because we guarantee eyes were on the glass.

**Q: Why not just use eye-tracking to see exactly which ad they are reading?**
**A:** True, pinpoint eye tracking (knowing exactly where on a screen a user is looking) requires user calibration (looking at dots on the screen to map the camera to their unique eye shape and corneal curvature). In a passive, walk-by DOOH environment, calibration is impossible. Attempting to guess the exact gaze point on a tablet screen from several feet away using a standard webcam without calibration results in incredibly noisy, inaccurate data that would constantly misattribute impressions. Avoiding heavily granular retina-tracking also provides a stronger privacy stance. Our head pose estimation is the perfect balance of verified engagement and privacy-respecting hardware practicality.

**Q: If someone stares at the screen for their entire 20-minute Uber ride, does that generate unlimited impressions?**
**A:** No. We use a **Time-Based Cooldown** (Rule 2). When a user looks at the screen and logs an impression, a cooldown timer (e.g., 10 seconds) must expire before a *new* impression can be counted for that same user. If they stare continuously for the entire 20-minute ride, their *Attention Time* metric will be massive (which commands a premium), but the impression counter will increment at a controlled, realistic rate tied to our ad rotation speed, never inflating out of control.

**Q: What if the environment is extremely crowded and multiple people glance at once?**
**A:** Our edge AI model is configured to process multiple faces simultaneously. The state machine (Threshold, Debounce, and Drop-Off rules) is tracked independently for *each unique face* in the frame. If five people are looking at the same time and all cross the 500ms threshold, that logs as exactly five verified impressions, accurately reflecting the crowd engagement.

**Q: What if someone is wearing a mask or dark sunglasses?**
**A:** The AI relies on identifying key facial landmarks to establish pose. Heavy obscuration (like dark sunglasses that hide the eyes completely) may prevent the system from validating a gaze. In these cases, the system errs on the side of caution and will *not* register an impression. This means our metrics provide a conservative, "guaranteed minimum" count of highly-engaged viewers, ensuring advertisers are never over-billed for ambiguous data.
