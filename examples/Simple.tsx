import React, { useState } from "react";
import CSSTransition from "../src";
import "./index.scss";

export default function() {
    const [visible, setVisible] = useState(true);

    return (
        <div>
            <button onClick={() => setVisible(!visible)}>切换</button>
            <p>{visible ? "进入" : "离开"}</p>
            <CSSTransition timeout={500} visible={visible}>
                <div className="block" />
            </CSSTransition>
        </div>
    );
}
