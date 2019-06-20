import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  mount?: boolean;
  children: ReactNode;
  portalElementTag?: string;
  portalDataName?: string;
  appendInTag?: string;
}

interface PortalStates {
  portal: HTMLElement | undefined;
}

class Portal extends React.Component<PortalProps, PortalStates> {
  public componentWillMount() {
    if (this.props.mount) {
      this.createPortal();
    }
  }

  public componentWillReceiveProps(nextProps: PortalProps) {
    if (nextProps.mount !== this.props.mount) {
      if (nextProps.mount) {
        this.createPortal();
      } else {
        this.clearPortal();
      }
    }
  }

  public componentWillUnmount() {
    this.clearPortal();
  }

  public clearPortal = () => {
    if (this.state && this.state.portal && this.state.portal.parentNode) {
      this.state.portal.parentNode.removeChild(this.state.portal);
    }
  };

  public createPortal = () => {
    const {
      appendInTag = "body",
      portalDataName = "reader",
      portalElementTag = "div"
    } = this.props;
    const newPortal = document.createElement(portalElementTag);
    newPortal.setAttribute("data-portal", portalDataName);
    document.getElementsByTagName(appendInTag)[0].appendChild(newPortal);
    this.setState({
      portal: newPortal
    });
  };

  public render() {
    const { children } = this.props;
    return this.state && this.state.portal
      ? ReactDOM.createPortal(children, this.state.portal)
      : null;
  }
}
export default Portal;
