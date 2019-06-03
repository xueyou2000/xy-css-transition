import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransitionProps } from "./interface";

function CSSTransition(props: CSSTransitionProps) {
    const { visible, name = "transition", children, timeout, animateOnInit = false, onAppear, onAppearComplete, onLeave, onLeaveComplete } = props;
    const ref = useRef(null);
    const [appear, appearActive, leave, leaveActive] = [`${name}-appear`, `${name}-appear-active`, `${name}-leave`, `${name}-leave-active`];
    const firstFlag = useRef(true);
    const timeHandler = useRef(null);

    function clearTimeHandle() {
        clearTimeout(timeHandler.current);
        timeHandler.current = null;
    }

    function transitionEnter() {
        const ele = ReactDOM.findDOMNode(ref.current) as HTMLElement;
        if (!ele) {
            return;
        }
        ele.style.display = null;
        ele.classList.remove(appear, appearActive);
        clearTimeHandle();
        if (onAppearComplete) {
            onAppearComplete();
        }
    }

    function transitionLeave() {
        const ele = ReactDOM.findDOMNode(ref.current) as HTMLElement;
        if (!ele) {
            return;
        }
        ele.classList.remove(leave, leaveActive);
        ele.style.display = "none";
        clearTimeHandle();
        if (onLeaveComplete) {
            onLeaveComplete();
        }
    }

    // 执行进入
    function toggleAppear() {
        const ele = ReactDOM.findDOMNode(ref.current) as HTMLElement;
        if (!ele) {
            return;
        }

        if (animateOnInit && firstFlag.current) {
            ele.style.display = "none";
            ele.classList.add(appear);
            // Tips: 这一行至关重要, 确保了浏览器重绘
            // This is for to force a repaint,
            // which is necessary in order to transition styles when adding a class name.
            ele && ele.scrollTop;
        }

        if (onAppear) {
            onAppear();
        }

        requestAnimationFrame(() => {
            ele.style.display = "block";
            // 离开动画还没结束就立刻移除结束样式
            if (ele.classList.contains(leaveActive)) {
                ele.classList.remove(leaveActive, leave);
            }
            ele.classList.add(appear);

            requestAnimationFrame(() => {
                ele.classList.add(appearActive);
                timeHandler.current = window.setTimeout(() => {
                    transitionEnter();
                }, timeout);
            });
        });
    }

    // 执行离开
    function toggleLeave() {
        const ele = ReactDOM.findDOMNode(ref.current) as HTMLElement;
        if (!ele) {
            return;
        }

        if (animateOnInit && firstFlag.current) {
            ele.style.display = "none";
            ele.classList.add(leave);
            // Tips: 这一行至关重要, 确保了浏览器重绘
            ele.clientHeight;
        }

        if (onLeave) {
            onLeave();
        }

        requestAnimationFrame(() => {
            ele.style.display = null;
            // 进入动画还没结束就立刻移除结束样式
            if (ele.classList.contains(appearActive)) {
                ele.classList.remove(appearActive, appear);
            }

            ele.classList.add(leave);
            requestAnimationFrame(() => {
                ele.classList.add(leaveActive);
                timeHandler.current = window.setTimeout(() => {
                    transitionLeave();
                }, timeout);
            });
        });
    }

    useEffect(() => {
        clearTimeHandle();
        if (visible) {
            toggleAppear();
        } else {
            toggleLeave();
        }
        firstFlag.current = false;
    }, [visible]);

    useEffect(() => {
        // children更变重置firstFlag状态
        firstFlag.current = true;
    }, [children]);

    return React.cloneElement(children as any, { ref });
}

export default React.memo(CSSTransition);
