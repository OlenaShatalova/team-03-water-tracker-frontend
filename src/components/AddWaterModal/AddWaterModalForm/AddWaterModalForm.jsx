// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useId } from "react";
// import css from "../../AddWaterModal/AddWaterModal.module.css"
// import Input from "../../Input/Input"


// const validationSchema = Yup.object({
//     option: Yup.string().required("Required"),
// });

// const AddWaterModalForm = () => {

//     const time = useId();
//     const water = useId();
//     return (
//         <>
//             <Formik
//                 initialValues={{ option: "" }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values) => {
//                     console.log(values.liters)
//                 }}
//             >
//                 {({ values }) => (
//                     <Form>
//                         <div>
//                             <label className={css.text} htmlFor={time}>Recording time:</label>
//                             <Field as={Input} placeholder={"07:00"} type="text" name={time} id={time} />
//                         </div>

//                         <div className={css.containerBeforeValue}>
//                             <label htmlFor={water}><p className={css.subTitle}>Enter the value of the water used:</p></label>
//                             <Field as={Input} placeholder={"50"} type="number" name={water} id={water}

//                             />
//                         </div>

//                         <div className={css.buttonAndNumberContainer}>
//                             <p className={css.valueNumber}>{liters} ml</p>
//                             <button className={css.button} type="submit">Save</button>
//                         </div>
//                     </Form>
//                 )}

//             </Formik>
//         </>
//     )
// }

// export default AddWaterModalForm