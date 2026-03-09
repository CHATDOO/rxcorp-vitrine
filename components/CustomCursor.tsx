"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + "px";
                dotRef.current.style.top = mouseY + "px";
            }
        };

        let raf: number;
        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + "px";
                ringRef.current.style.top = ringY + "px";
            }
            raf = requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(animate);

        const onEnter = () => {
            if (ringRef.current) {
                ringRef.current.style.width = "44px";
                ringRef.current.style.height = "44px";
                ringRef.current.style.borderColor = "#FF1744";
            }
        };
        const onLeave = () => {
            if (ringRef.current) {
                ringRef.current.style.width = "30px";
                ringRef.current.style.height = "30px";
                ringRef.current.style.borderColor = "rgba(232,0,45,0.6)";
            }
        };

        const interactables = document.querySelectorAll("a, button, [data-cursor]");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div id="cursor-dot" ref={dotRef} />
            <div id="cursor-ring" ref={ringRef} />
        </>
    );
}
