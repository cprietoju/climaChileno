import React from "react";


// Define the props type for the HighlightBox component


const HighlightBox = ({ title, value, Icon }) => {
    return (
        <div
            style={{
                backgroundColor: "rgb(56, 102, 65)",
                color: "white",
                padding: "1rem",
                borderRadius: "1.5rem",
                width: "180px",
                height: "80px",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
        >
            <div>
                <div style={{ fontSize: "20px" }}>{title}</div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {Icon && <Icon style={{ fontSize: "30px" }} />}
                    <p style={{ fontSize: "30px" }}>{value}</p>
                </div>
            </div>
        </div>
    );
};

export default HighlightBox;