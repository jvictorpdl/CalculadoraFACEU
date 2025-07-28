import styled from "styled-components";

export const VerticalSplitter = styled.div`
    width:  ${(props) => (props.width ?? '1px')};
    height: ${(props) => (props.height ?? '270px')};
    margin-left: ${(props) => (props.margin ?? '16px')};
    margin-right: ${(props) => (props.margin ?? '16px')};
    stroke-width: 1px;
    stroke: rgba(0, 0, 0, 0.08);
    background: #5c5c5c28
`


export const HorizontalSplitter = styled.div`
    width:  ${(props) => (props.width)};
    height: ${(props) => (props.height ?? '1px')};
    margin-top: ${(props) => (props.margin ?? '16px')};
    margin-bottom: ${(props) => (props.margin ?? '16px')};
    stroke-width: 1px;
    stroke: rgba(0, 0, 0, 0.08);
    background: #5c5c5c28
`