export const CdnImg = (props) => (
  <img
    src={
      location?.protocol === "http:"
        ? props.src
        : `https://cdn.jsdelivr.net/gh/chakornk/chakornk.github.io@main/public/${props.src}`
    }
    {...props}
  />
);
