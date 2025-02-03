import styles from "./DailyNorma.module.css"

const onOpenModal = () => {
    console.log("Succesfully opened modal!")
}

const DailyNorma = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>My daily norma</h3>
            <div className={styles.containerForNumbers}>
                <div className={styles.number}>1.5 L</div>
                <button onClick={onOpenModal} className={styles.button}>Edit</button>
            </div>
        </div>
    )
}

export default DailyNorma