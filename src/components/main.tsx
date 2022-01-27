import { useDispatch } from "react-redux";
import { sendMessageThunk } from "../redux/reducer";
import styles from "./main.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

interface MyProps {
    entropy: number | null;
}

class Main extends React.Component<MyProps, {}> {
    render() {
        return (
            <div className={styles.wrapper}>
                <MainForm />
                {this.props.entropy ? <div className={styles.output_text}> <span>Calculated Entropy: </span><span className={styles.entropy_text}> {this.props.entropy}</span></div> : <></>}
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    entropy: state.appReducer.calculatedEntropy,
});

let MainComponent = connect(mapStateToProps, {})(Main);

type submitObjectType = {
    message: string;
};

const MainForm = (props: any) => {
    let dispatch = useDispatch();
    const validationForm = yup.object().shape({
        message: yup
            .string()
            .typeError("This input need to be string")
            .required("This field is required"),
    });
    const submit = (
        values: submitObjectType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        dispatch(sendMessageThunk(values.message));
        setSubmitting(false);
    };
    return (
        <div className={styles.form_wrapper}>
            <Formik
                initialValues={{
                    message: "",
                }}
                onSubmit={submit}
                validationSchema={validationForm}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="message" className={styles.form_text}>Message</label>
                        <input
                            type="text"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            className={styles.form_input}
                        />
                        <button disabled={isSubmitting} type="submit" className={styles.form_btn}>
                            Submit
                        </button>
                        {touched.message && errors.message && (
                            <p className={styles.error_text}>{errors.message}</p>
                        )}
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default MainComponent;
