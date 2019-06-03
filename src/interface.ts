export interface CSSTransitionProps {
    /**
     * 过渡时间
     * @description 需要与css里的过渡时间保持一直
     */
    timeout: number;
    /**
     * 显示动画/隐藏动画
     */
    visible: boolean;
    /**
     * 过渡css样式名称
     */
    name?: string;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 第一次是否执行动画
     */
    animateOnInit?: boolean;
    /**
     * 进入过渡开始事件
     */
    onAppear?: Function;
    /**
     * 进入过渡完毕事件
     */
    onAppearComplete?: Function;
    /**
     * 离开过渡开始事件
     */
    onLeave?: Function;
    /**
     * 离开过渡完毕事件
     */
    onLeaveComplete?: Function;
}
