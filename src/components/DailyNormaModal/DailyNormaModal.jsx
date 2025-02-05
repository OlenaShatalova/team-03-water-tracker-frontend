import { useDispatch, useSelector } from "react-redux";
import { selectIsWaterRateModalOpen } from "../../redux/modal/selectors"
import { closeModal } from "../../redux/modal/slice";
import { useCallback, useEffect, useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./DailyNormaModal.module.css"
import Input from "../Input/Input";

const validationSchema = Yup.object({
    option: Yup.string().required("Required"),
});

const DailyNormaModal = () => {
    const womanBtnId = useId();
    const manBtnId = useId();
    const kgId = useId();
    const sportTimes = useId();
    const howMuchWater = useId();

    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsWaterRateModalOpen);
    const onModalClose = useCallback(() => {
        dispatch(closeModal("isWaterRateOpen"));
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
                    <h2 className={css.title}>My daily norma</h2>
                    <button className={css.closeButton} onClick={onModalClose}>
                        {/* <ReactSVG src={iconName} className={css.iconStyle} /> */}
                        ❌
                    </button>
                </div>

                <div className={css.explanation}>
                    <div className={css.containerForCalc}>
                        <p className={css.text}>For girl: <span className={css.blueText}>V=(M*0,03) + (T*0,4)</span></p>
                        <p className={css.text}>For man: <span className={css.blueText}>V=(M*0,04) + (T*0,6)</span></p>
                    </div>

                    <div className={css.containerForSmallText}>
                        <p className={css.smallText}>
                            <span>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
                        </p>
                    </div>
                </div>

                <Formik
                    initialValues={{ option: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values.kg)
                    }}
                >
                    {/* {({ values }) => ( */}
                    <Form>
                        <div>
                            <p className={css.subTitle}>Calculate your rate:</p>
                            <div className={css.radioContainer}>
                                <div className={css.radio}>
                                    <Field className={css.radioButton} type="radio" name="option" value="For woman" id={womanBtnId} />
                                    <label htmlFor={womanBtnId}>For woman</label>
                                </div>

                                <div className={css.radio}>
                                    <Field className={css.radioButton} type="radio" name="option" value="For man" id={manBtnId} />
                                    <label htmlFor={manBtnId}>For man</label>
                                </div>
                            </div>
                            <ErrorMessage name="option" component="span" style={{ color: "red" }} />
                        </div>

                        <div className={css.containerForQuestion}>
                            <label htmlFor={kgId}>Your weight in kilograms:</label>
                            {/* <Field type="number" name="kg" id={kgId} /> */}
                            <Input placeholder={0} type="number" name="kg" id={kgId} />
                            <ErrorMessage name="kg" component="span" style={{ color: "red" }} />
                        </div>

                        <div className={css.containerForQuestion}>
                            <label htmlFor={sportTimes}>The time of active participation in sports or other activities with a high physical. load in hours:</label>
                            {/* <Field type="number" name="sportTimes" id={sportTimes} /> */}
                            < Input placeholder={0} type="number" name="sportTimes" id={sportTimes} />
                            <ErrorMessage name="sportTimes" component="span" style={{ color: "red" }} />
                        </div>

                        <div className={css.containerForWater}>
                            <p className={css.textWidth}>The required amount of water in liters per day:</p>
                            <p className={css.valueOfWater}>1.8 L</p>
                        </div>

                        <div>
                            <label className={css.subTitle} htmlFor={howMuchWater}>Write down how much water you will drink:</label>
                            {/* <Field type="number" name="howMuchWater" id={howMuchWater} /> */}
                            <Input placeholder={0} type="number" name="howMuchWater" id={howMuchWater} />
                        </div>


                        <button className={css.button} type="submit">Save</button>
                    </Form>
                    {/* )} */}
                </Formik>


            </div>
        </div>
    )
}

export default DailyNormaModal