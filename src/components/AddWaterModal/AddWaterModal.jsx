import { useDispatch, useSelector } from "react-redux";
import { selectCurrentDate, selectIsAddWaterModalOpen } from "../../redux/water/waterSelectors";
import { closeModal } from "../../redux/water/waterSlice";
import { Field, Form, Formik } from "formik";
import { useCallback, useEffect, useId, useState } from "react";
import css from "./AddWaterModal.module.css";
import Input from "../Input/Input";
import * as Yup from "yup";
import Icon from "../Icon/Icon.jsx";
import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';

const validationSchema = Yup.object({
    time: Yup.string().required("Required"),
    water: Yup.number().min(50, "Minimum 50 ml").required("Required"),
});

const initialValues = {
    time: "",
    water: 0,
};

const AddWaterModal = () => {
    const currentTime = useSelector(selectCurrentDate);
    const time = useId();
    const water = useId();

    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsAddWaterModalOpen);
    const onModalClose = useCallback(() => {
        dispatch(closeModal("isAddWaterOpen"));
    }, [dispatch]);

    const handleSubmit = (values) => {
        console.log(values.water);
        dispatch(closeModal("isAddWaterOpen"));
    };

    // закриття модалки на esc
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onModalClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onModalClose]);

    if (!isOpen) return null;

    return (
        <div onClick={onModalClose} className={css.modalOverlay}>
            <div onClick={(e) => e.stopPropagation()} className={css.modal}>
                <div className={css.containerForTitleAndButton}>
                    <h2 className={css.title}>Add water</h2>
                    <button className={css.closeButton} onClick={onModalClose}>
                        <Icon
                            name="icon-cross"
                            width={24}
                            height={24}
                            color="#407BFF"
                            className={css.icon}
                        />
                    </button>
                </div>
                <p className={css.subTitle}>Choose a value:</p>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form>
                            <div>
                                <p className={css.text}>Amount of water:</p>
                                <div className={css.buttonsContainer}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (values.water > 50) {
                                                setFieldValue("water", values.water - 50);  // Обновляем значение воды через Formik
                                            }
                                        }}
                                        className={css.roundButtons}
                                    >
                                        <Icon
                                            name="icon-minus"
                                            width={24}
                                            height={24}
                                            color="#407BFF"
                                            className={css.icon}
                                        />
                                    </button>
                                    <div className={css.valueOfWater}>
                                        <p className={css.valueNumber}>{values.water} ml</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFieldValue("water", values.water + 50)}  // Обновляем значение воды через Formik
                                        className={css.roundButtons}
                                    >
                                        <ReactSVG src={plus} className={css.plusIcon} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className={css.text} htmlFor="time">Recording time:</label>
                                <Field
                                    as={Input}
                                    placeholder="07:00"
                                    type="text"
                                    name="time"
                                    id="time"
                                />
                            </div>

                            <div className={css.containerBeforeValue}>
                                <label htmlFor="water">
                                    <p className={css.subTitle}>Enter the value of the water used:</p>
                                </label>
                                <Field
                                    as={Input}
                                    value={values.water}
                                    onChange={handleChange}
                                    placeholder="50"
                                    type="number"
                                    name="water"
                                    id="water"
                                />
                            </div>

                            <div className={css.buttonAndNumberContainer}>
                                <p className={css.valueNumber}>{values.water} ml</p>
                                <button className={css.button} type="submit">Save</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddWaterModal;
