import React, { FunctionComponent, useRef } from "react";
import posed, { PoseGroup } from "react-pose";
import Portal from "../../components/Portal";
import Error from "../../components/Icons/Error";
import Snackbar from "../Snackbar";

const Msg = posed.div({
  from: { opacity: 0, height: 0 },
  enter: {
    opacity: 1,
    height: "auto",
    transition: {
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      ease: [0.4, 0, 0.2, 1],
      height: {
        delay: 300
      }
    }
  }
});

export enum SnackbarVariant {
  Error = "error",
  Success = "success"
}

export interface SnackItem {
  id: number;
  message: string;
  variant: SnackbarVariant;
}

export interface SnackbarContainerProps {
  snacks: Array<SnackItem>;
  onSnackRemove: (key: number) => void;
}

const SnackbarContainer: FunctionComponent<SnackbarContainerProps> = ({
  onSnackRemove,
  snacks
}: SnackbarContainerProps) => {
  const snacksRef = useRef(snacks);

  snacksRef.current = snacks;

  function onMsgComplete(key: number) {
    return () => {
      setTimeout(() => {
        if (snacksRef.current.findIndex(s => s.id === key) >= 0) {
          onSnackRemove(key);
        }
      }, 5000);
    };
  }

  return (
    <Portal mount={true}>
      <div className="snackbars">
        <PoseGroup preEnterPose="from" flipMove={false}>
          {snacks.map(k => (
            <Msg
              key={k.id}
              className="snackbars__msg"
              onPoseComplete={onMsgComplete(k.id)}
            >
              <Snackbar
                renderIcon={
                  k.variant === SnackbarVariant.Error ? <Error /> : undefined
                }
                variant={k.variant}
              >
                {k.message}
              </Snackbar>
            </Msg>
          ))}
        </PoseGroup>
      </div>
    </Portal>
  );
};

export default SnackbarContainer;
