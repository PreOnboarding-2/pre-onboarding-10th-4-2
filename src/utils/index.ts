import { RefObject } from "react";

export const blurInput = (
  ref: RefObject<HTMLInputElement>,
  formRef: RefObject<HTMLFormElement>
) => {
  const { scrollWidth, clientWidth } = ref.current!;
  if (scrollWidth > clientWidth && scrollWidth > 290)
    formRef.current!.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
  else formRef.current!.style.boxShadow = "none";
};
