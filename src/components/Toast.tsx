import { Motion } from "solid-motionone";
import type { ParentComponent } from "solid-js";

const Toast: ParentComponent = (props) => {
  return (
    <Motion.div
      animate={{ opacity: [0, 1], x: ["-60%", "-50%"] }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: "-10%", transition: { duration: 0.5 } }}
      class="fixed top-[15%] left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-sm"
    >
      {props.children}
    </Motion.div>
  );
};

export default Toast;
