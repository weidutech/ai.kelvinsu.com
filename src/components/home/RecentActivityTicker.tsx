"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const activities = [
  "刚刚 138****4920 注册了账号",
  "1 分钟前 用户 K**v 解锁了高阶实战课",
  "刚刚 186****1029 加入了年度会员",
  "2 分钟前 张** 预约了 1V1 咨询",
  "3 分钟前 用户 a**9 注册了账号",
  "刚刚 159****8832 解锁了高阶实战课",
  "5 分钟前 李** 注册了账号",
  "刚刚 用户 m**c 加入了年度会员",
];

export function RecentActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500); // 500ms fade duration matches CSS transition

    }, 4500); // Change text every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[40px] justify-center overflow-hidden">
      <div className="flex text-amber-500 text-sm mb-1">
        ★★★★★
      </div>
      <span 
        className={cn(
          "text-sm font-semibold text-slate-700 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        {activities[currentIndex]}
      </span>
    </div>
  );
}
