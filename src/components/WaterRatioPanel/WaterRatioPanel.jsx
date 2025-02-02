// import IconPlus from "../../assets/icons/icon-plus.svg";
import styles from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.progressBarContainer}>
                <h3 className={styles.title}>Today</h3>
                <div className={styles.progressBar}>цей прости господи ползунок😭</div>
            </div>
            <button className={styles.button}>
                {/* <img src={IconPlus} alt="Add water" width={24} height={24} className={styles.icon} /> */}
                <svg className={styles.icon} width={24} height={24} viewBox="0 0 24 24">
                    <path fill="none" stroke="#fff" style={{ stroke: 'var(--color1, #fff)' }} strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="4" strokeWidth="2" d="M12 9v6M15 12h-6M21 12c0 1.182-0.233 2.352-0.685 3.444s-1.115 2.084-1.951 2.92c-0.836 0.836-1.828 1.499-2.92 1.951s-2.262 0.685-3.444 0.685-2.352-0.233-3.444-0.685c-1.092-0.452-2.084-1.115-2.92-1.951s-1.499-1.828-1.951-2.92c-0.452-1.092-0.685-2.262-0.685-3.444 0-2.387 0.948-4.676 2.636-6.364s3.977-2.636 6.364-2.636c2.387 0 4.676 0.948 6.364 2.636s2.636 3.977 2.636 6.364z"></path>
                </svg>
                Add water
            </button>
        </div>
    )
}

export default WaterRatioPanel