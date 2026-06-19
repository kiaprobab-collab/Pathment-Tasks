
const Buttons = ({ children, onClick,variant = "default" }) => {
  const styles = {
    default: {
      backgroundColor: "#18181B",
      color: "white",
      border: "none",
    },
    outline: {
      backgroundColor: "white",
      color: "#18181B",
      border: "1px solid #E4E4E7",
    },
    secondary: {
      backgroundColor: "#F4F4F5",
      color: "#18181B",
      border: "none",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: "10px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
};

export default Buttons;

