import { FC } from 'react';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SettingsValues } from '../Settings/Settings';
import { Form as BSForm, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

export interface QuizValues {
	guess: string;
}

const QuizSchema = Yup.object().shape({
	guess: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
});

const initialQuizValues: QuizValues = { guess: '' };

interface QuizProps {
	submitFn: (values: QuizValues, actions: FormikHelpers<QuizValues>) => void;
	resetFn: () => void;
	refreshFn: (settings: SettingsValues) => void;
	settings: SettingsValues;
}

const Quiz: FC<QuizProps> = ({ submitFn, resetFn, refreshFn, settings }) => {
	return (
		<>
			<Formik
				initialValues={initialQuizValues}
				onSubmit={submitFn}
				validationSchema={QuizSchema}
				enableReinitialize={true}>
				{({ touched, errors }) => (
					<Form className={'border border-dark rounded py-3 px-4 bg-light'}>
						<BSForm.Group className="mb-3">
							<BSForm.Label htmlFor="guess">Name that Pokemon!</BSForm.Label>
							<Field
								id="guess"
								name="guess"
								placeholder="Guess"
								className={touched.guess && errors.guess ? 'form-control is-invalid' : 'form-control'}
								as={BSForm.Control}
							/>
							<ErrorMessage name="guess" component="div" className={'invalid-feedback'} />
						</BSForm.Group>

						<Row className={`justify-content-center`}>
							<Col>
								<Button variant="secondary" onClick={resetFn} type="button" className="w-100">
									Change Settings
								</Button>
							</Col>
							<Col>
								<Button variant="outline-info" onClick={() => console.log('hint')} type="button" className="w-100">
									Hint
								</Button>
							</Col>
							<Col>
								<Button
									variant="warning"
									onClick={() => refreshFn(settings)}
									type="button"
									className="w-100">
									<FontAwesomeIcon icon={faArrowRotateRight} /> Get New Pokemon
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Quiz;
