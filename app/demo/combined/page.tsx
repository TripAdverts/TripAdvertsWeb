"use client";

import { useState, useCallback, useEffect } from "react";
import FaceTracker from "../../components/ai/FaceTracker";
import { useImpressionTracker } from "../../hooks/useImpressionTracker";
import { useReachTracker } from "../../hooks/useReachTracker";

const ADS = [
    { src: "/demo-assets/main.mp4", label: "Main Feature Ad" },
    { src: "/demo-assets/side.mp4", label: "Promo 1" },
    { src: "/demo-assets/header.mp4", label: "Promo 2" },
    { src: "/demo-assets/footer.mp4", label: "Promo 3" },
];
const CAROUSEL_INTERVAL_MS = 5000;

export default function CombinedDemoPage() {
    const [facesDetected, setFacesDetected] = useState(0);
    const [isGazeValidated, setIsGazeValidated] = useState(false);
    const [faceLandmarks, setFaceLandmarks] = useState<any[]>([]);

    const [layout, setLayout] = useState<'sidebar' | 'grid' | 'carousel'>('sidebar');
    const [activeAd, setActiveAd] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);

    const adSessionId = layout === 'carousel' ? `carousel-${activeAd}` : `${layout}-${cycleCount}`;

    const metrics = useImpressionTracker(faceLandmarks, isGazeValidated, adSessionId);
    const reachCoords = useReachTracker(faceLandmarks);

    const handleFaceDetected = useCallback((result: any) => {
        setFacesDetected(result.faceLandmarks?.length || 0);
        if (result.faceLandmarks) {
            setFaceLandmarks(result.faceLandmarks);
        }
    }, []);

    const handleGazeChange = useCallback((isValidated: boolean) => {
        setIsGazeValidated(isValidated);
    }, []);

    const formatTime = (ms: number) => {
        return (ms / 1000).toFixed(1) + "s";
    };

    useEffect(() => {
        if (layout !== 'carousel') return;
        setActiveAd(0);
        const id = setInterval(() => {
            setActiveAd(prev => (prev + 1) % ADS.length);
        }, CAROUSEL_INTERVAL_MS);
        return () => clearInterval(id);
    }, [layout]);
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 sm:p-12 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-[1400px] w-full">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold mb-2">Interactive Smart Display</h1>
                        <p className="text-zinc-400 max-w-2xl">
                            The comprehensive production dashboard. Watch the dynamic display layout operate simultaneously with the anonymous background telemetry tracking engagement in real-time.
                        </p>
                    </div>

                    {/* Layout Toggle */}
                    <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 shrink-0">
                        <button
                            onClick={() => setLayout('sidebar')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${layout === 'sidebar' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Sidebar Layout
                        </button>
                        <button
                            onClick={() => setLayout('grid')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${layout === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Grid Layout
                        </button>
                        <button
                            onClick={() => setLayout('carousel')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${layout === 'carousel' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Fullscreen Carousel
                        </button>
                    </div>
                </div>

                {/* Demo Frame */}
                <div className="grid md:grid-cols-12 gap-8">

                    {/* Main Ad Feed Wrapped in Tablet */}
                    <div className="col-span-12 relative flex flex-col items-center">
                        <div className="relative w-full max-w-[1100px] flex items-center justify-center pb-12">
                            <img
                                src="/demo-assets/tablet-frame.png"
                                alt="Android Tablet Frame"
                                className="relative w-full h-auto z-20 pointer-events-none select-none drop-shadow-2xl"
                            />
                            {/* The Screen Content */}
                            <div className="absolute top-[5%] bottom-[10%] left-[2.5%] right-[2.5%] z-30 bg-black rounded-lg overflow-hidden">
                                {layout === 'carousel' ? (
                                    <div className="relative w-full h-full">
                                        {ADS.map((ad, i) => (
                                            <div
                                                key={ad.src}
                                                className="absolute inset-0 transition-opacity duration-700"
                                                style={{ opacity: i === activeAd ? 1 : 0 }}
                                            >
                                                <video src={ad.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">{ad.label}</div>
                                            </div>
                                        ))}
                                        {/* Progress dots */}
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {ADS.map((_, i) => (
                                                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeAd ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`w-full h-full bg-zinc-900 grid gap-2 p-1.5 sm:p-2 ${layout === 'sidebar' ? 'grid-cols-4' : 'grid-cols-5 grid-rows-6'}`}>

                                        {layout === 'sidebar' ? (
                                            <>
                                                {/* Main Feature Ad (75% width, 16:9) */}
                                                <div className="col-span-3 bg-black rounded-lg overflow-hidden relative border border-white/5 shadow-2xl">
                                                    <video src="/demo-assets/main.mp4" autoPlay muted playsInline className="w-full h-full object-cover" onEnded={(e) => { e.currentTarget.play(); setCycleCount(c => c + 1); }} />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Main Feature Ad</div>
                                                </div>

                                                {/* Right Sidebar Stack (25% width) - 3 smaller ads */}
                                                <div className="col-span-1 flex flex-col gap-2 h-full">
                                                    {/* Side Ad 1 */}
                                                    <div className="flex-1 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                        <video src="/demo-assets/side.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Promo 1</div>
                                                    </div>

                                                    {/* Side Ad 2 */}
                                                    <div className="flex-1 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                        <video src="/demo-assets/header.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Promo 2</div>
                                                    </div>

                                                    {/* Side Ad 3 */}
                                                    <div className="flex-1 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                        <video src="/demo-assets/footer.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Promo 3</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Header Ad */}
                                                <div className="col-span-4 row-span-1 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                    <video src="/demo-assets/header.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Header Ad Space</div>
                                                </div>

                                                {/* Side Ad */}
                                                <div className="col-span-1 row-span-6 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                    <video src="/demo-assets/side.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Side Ad</div>
                                                </div>

                                                {/* Main Ad */}
                                                <div className="col-span-4 row-span-4 bg-black rounded-lg overflow-hidden relative border border-white/5 shadow-2xl">
                                                    <video src="/demo-assets/main.mp4" autoPlay muted playsInline className="w-full h-full object-cover" onEnded={(e) => { e.currentTarget.play(); setCycleCount(c => c + 1); }} />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Main Feature Ad</div>
                                                </div>

                                                {/* Footer Ad */}
                                                <div className="col-span-4 row-span-1 bg-black rounded-lg overflow-hidden relative border border-white/5">
                                                    <video src="/demo-assets/footer.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] px-2 py-1 rounded text-white font-mono uppercase tracking-widest border border-white/10 shadow-lg">Footer Ad Space</div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                )}
                            </div>

                            {/* The Hidden AI Engine */}
                            <div className="absolute opacity-0 pointer-events-none w-full h-full z-0">
                                <FaceTracker
                                    width={640}
                                    height={480}
                                    showOverlay={false}
                                    onFaceDetected={handleFaceDetected}
                                    onGazeChange={handleGazeChange}
                                />
                            </div>
                        </div>

                        {/* Silent HUD Overlay (For Demo Purposes Only) */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-zinc-800 rounded-xl p-4 z-40 flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                            <div className="flex gap-6 items-center">
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Gaze Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isGazeValidated ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : facesDetected > 0 ? 'bg-red-500' : 'bg-zinc-600'}`}></div>
                                        <span className={`text-sm font-semibold ${isGazeValidated ? 'text-green-400' : facesDetected > 0 ? 'text-red-400' : 'text-zinc-500'}`}>
                                            {facesDetected === 0 ? 'NO FACE' : isGazeValidated ? 'VALIDATED' : 'TRACKING LOST'}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-l border-zinc-800 pl-6 w-38">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Ad Session ID</p>
                                    <span className="text-sm font-mono font-bold text-zinc-300">
                                        {adSessionId}
                                    </span>
                                </div>
                                <div className="border-l border-zinc-800 pl-6 w-32">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Dwell Time</p>
                                    <span className="text-sm font-mono font-bold text-zinc-300">
                                        {formatTime(metrics.currentDwellTime)}
                                    </span>
                                </div>
                                <div className="border-l border-zinc-800 pl-6 w-32">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Attention Time</p>
                                    <span className="text-sm font-mono font-bold text-zinc-300">
                                        {formatTime(metrics.currentAttentionTime)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-6 items-center">
                                <div className="text-right">
                                    <p className="text-[10px] text-teal-400 font-mono uppercase tracking-wider mb-1">Unique Reach</p>
                                    <div className="text-2xl font-black text-white font-mono leading-none">
                                        {reachCoords.uniqueReach}
                                    </div>
                                </div>
                                <div className="text-right border-l border-zinc-800 pl-6">
                                    <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider mb-1">Verified Impressions</p>
                                    <div className="text-2xl font-black text-white font-mono leading-none">
                                        {metrics.totalImpressions}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
