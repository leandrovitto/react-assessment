import React from "react";

const Modal = ({
  openModal,
  //@ts-ignore
  setOpenModal,
  children,
  style,
}: {
  openModal: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <>
      {openModal && (
        <div className="centered modal" style={style}>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
