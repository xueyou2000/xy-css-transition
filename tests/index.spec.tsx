import React from "react";
import { render } from "@testing-library/react";
import CSSTransition from "../src";

describe("CSSTransition", () => {
    jest.useFakeTimers();

    // mock requestAnimationFrame
    window.requestAnimationFrame = (fn) => {
        if (fn) {
            fn(10);
        }
        return null;
    };

    test("render", () => {
        const wrapper = render(
            <CSSTransition timeout={500} visible={true}>
                <p>Hello</p>
            </CSSTransition>,
        );
        jest.runOnlyPendingTimers();
        const p = wrapper.getByText("Hello");
        expect(p.textContent).toBe("Hello");

        // not animate on init
        expect(p.classList.contains("transition-appear")).toBeFalsy();
        expect(p.classList.contains("transition-appear-active")).toBeFalsy();
    });

    test("topggle hidden", () => {
        const onLeave = jest.fn();
        const onLeaveComplete = jest.fn();
        const wrapper = render(
            <CSSTransition timeout={500} visible={true}>
                <p>Hello</p>
            </CSSTransition>,
        );

        wrapper.rerender(
            <CSSTransition timeout={500} visible={false} onLeave={onLeave} onLeaveComplete={onLeaveComplete}>
                <p>Hello</p>
            </CSSTransition>,
        );
        const p = wrapper.getByText("Hello");

        expect(onLeave.mock.calls.length).toBe(1);
        expect(onLeaveComplete.mock.calls.length).toBe(0);
        expect(p.classList.contains("transition-leave")).toBeTruthy();
        expect(p.classList.contains("transition-leave-active")).toBeTruthy();
        jest.runOnlyPendingTimers();

        expect(p.classList.contains("transition-leave")).toBeFalsy();
        expect(p.classList.contains("transition-leave-active")).toBeFalsy();
        expect(p.style.display).toBe("none");
        expect(onLeaveComplete.mock.calls.length).toBe(1);
    });

    test("topggle show", () => {
        const onAppear = jest.fn();
        const onAppearComplete = jest.fn();
        const wrapper = render(
            <CSSTransition timeout={500} visible={false}>
                <p>Hello</p>
            </CSSTransition>,
        );

        wrapper.rerender(
            <CSSTransition timeout={500} visible={true} onAppear={onAppear} onAppearComplete={onAppearComplete}>
                <p>Hello</p>
            </CSSTransition>,
        );
        const p = wrapper.getByText("Hello");

        expect(onAppear.mock.calls.length).toBe(1);
        expect(onAppearComplete.mock.calls.length).toBe(0);
        expect(p.classList.contains("transition-appear")).toBeTruthy();
        expect(p.classList.contains("transition-appear-active")).toBeTruthy();
        jest.runOnlyPendingTimers();

        expect(p.classList.contains("transition-appear")).toBeFalsy();
        expect(p.classList.contains("transition-appear-active")).toBeFalsy();
        expect(onAppearComplete.mock.calls.length).toBe(1);
    });

    test("animate on init", () => {
        const onAppear = jest.fn();
        const onAppearComplete = jest.fn();
        const wrapper = render(
            <CSSTransition timeout={500} visible={true} onAppear={onAppear} onAppearComplete={onAppearComplete} animateOnInit={true}>
                <p>Hello</p>
            </CSSTransition>,
        );
        const p = wrapper.getByText("Hello");

        expect(onAppear.mock.calls.length).toBe(1);
        expect(onAppearComplete.mock.calls.length).toBe(0);
        expect(p.classList.contains("transition-appear")).toBeTruthy();
        expect(p.classList.contains("transition-appear-active")).toBeTruthy();
        jest.runOnlyPendingTimers();

        expect(p.classList.contains("transition-appear")).toBeFalsy();
        expect(p.classList.contains("transition-appear-active")).toBeFalsy();
        expect(onAppearComplete.mock.calls.length).toBe(1);
    });
});
