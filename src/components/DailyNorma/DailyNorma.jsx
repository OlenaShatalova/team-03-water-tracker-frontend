import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../redux/modal/slice"
import css from "./DailyNorma.module.css"
import { selectIsWaterRateModalOpen } from "../../redux/modal/selectors";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";


const DailyNorma = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsWaterRateModalOpen);

    const onOpenModal = () => {
        dispatch(openModal("isWaterRateOpen"))
        console.log("Modal window is opened!")
    }

    return (
        <div className={css.container}>
            <h3 className={css.title}>My daily norma</h3>
            <div className={css.containerForNumbers}>
                <div className={css.number}>1.5 L</div>
                <button onClick={onOpenModal} className={css.button}>Edit</button>
            </div>
            {isOpen && <DailyNormaModal />}
        </div>
    )
}

export default DailyNorma