import { useDispatch, useSelector } from "react-redux";
import { selectIsAddWaterModalOpen } from "../../redux/water/waterSelectors";
import { closeModal } from "../../redux/water/waterSlice";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useId } from "react";
import css from "./AddWaterModal.module.css"
import Input from "../Input/Input";
import * as Yup from "yup";

const validationSchema = Yup.object({
    option: Yup.string().required("Required"),
});

const AddWaterModal = () => {

    const time = useId();
    const water = useId();

    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsAddWaterModalOpen);
    const onModalClose = useCallback(() => {
        dispatch(closeModal("isAddWaterOpen"))
        console.log("Modal window is closed!")
    }, [dispatch]);

    // для закриття модалки на esc
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onModalClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onModalClose]);

    if (!isOpen) return null

    return (
        <div className={css.modalOverlay}>
            <div className={css.modal}>
                <div className={css.containerForTitleAndButton}>
                    <h2 className={css.title}>Add water</h2>
                    <button className={css.closeButton} onClick={onModalClose} >
                        {/* <ReactSVG src={iconName} className={css.iconStyle} /> */}
                        ❌
                    </button>
                </div>
                <p className={css.subTitle}>Choose a value:</p>
                <div>
                    <p className={css.text}>Amount of water:</p>
                    <div className={css.buttonsContainer}>
                        <button className={css.roundButtons}>-</button>
                        <div className={css.valueOfWater}>
                            <p className={css.valueNumber}>50 ml</p>
                        </div>
                        <button className={css.roundButtons}>+</button>
                    </div>
                </div>

                <Formik
                    initialValues={{ option: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values.liters)
                    }}
                >
                    <Form>
                        <div>
                            <label className={css.text} htmlFor={time}>Recording time:</label>
                            < Input placeholder={"07:00"} type="text" name={time} id={time} />
                        </div>

                        <div className={css.containerBeforeValue}>
                            <label htmlFor={water}><p className={css.subTitle}>Enter the value of the water used:</p></label>
                            <Input placeholder={50} type="number" name={water} id={water} />
                        </div>

                        <div className={css.buttonAndNumberContainer}>
                            <p className={css.valueNumber}>50ml</p>
                            <button className={css.button} type="submit">Save</button>
                        </div>
                    </Form>
                </Formik>

                {/* <div>
                    <p className={css.text}>Recording time:</p>
                    <input type="text" placeholder="07:00" />
                </div>

                <div>
                    <p className={css.subTitle}>Enter the value of the water used:</p>
                    <input type="text" placeholder="50" />
                </div> */}


            </div>
        </div>
    )
}

export default AddWaterModal