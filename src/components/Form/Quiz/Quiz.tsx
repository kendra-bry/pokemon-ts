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
	hintFn: () => void;
	refreshFn: (settings: SettingsValues) => void;
	settings: SettingsValues;
	guessCounter: number;
	successCounter: number;
}

const Quiz: FC<QuizProps> = ({ submitFn, resetFn, refreshFn, hintFn, settings, guessCounter, successCounter }) => {
	return (
		<div className={'border border-dark rounded py-3 px-4 bg-light'}>
			<Row className="border-bottom pb-2 mb-2 text-center">
				<Col>
					<div>Guesses: {guessCounter}</div>
				</Col>
				<Col>{/* <div>Timer: {settings.timer} seconds</div> */}</Col>
				<Col>
					<div>
						{successCounter}/{settings.cardLimit} Correct
					</div>
				</Col>
			</Row>

			<Formik
				initialValues={initialQuizValues}
				onSubmit={submitFn}
				validationSchema={QuizSchema}
				enableReinitialize={true}>
				{({ touched, errors }) => (
					<Form>
						<div className="d-flex align-items-end mb-3">
							<BSForm.Group className="w-100">
								<BSForm.Label htmlFor="guess">Name that Pokemon!</BSForm.Label>
								<Field
									id="guess"
									name="guess"
									placeholder="Guess"
									className={
										touched.guess && errors.guess ? 'form-control is-invalid' : 'form-control'
									}
									as={BSForm.Control}
								/>
								{/* <Field
								id="guess"
								name="guess"
								placeholder="Guess"
								className={touched.guess && errors.guess ? 'form-control is-invalid' : 'form-control'}
								as={() => (
									<Stack direction="horizontal" gap={3}>
										<BSForm.Control className="me-auto" placeholder="Add your item here..." />
										<Button type="submit" variant="secondary">
											Submit
										</Button>
									</Stack>
								)}
							/> */}
								<ErrorMessage name="guess" component="div" className={'invalid-feedback'} />
							</BSForm.Group>
							<div>
								<Button type="submit">Submit</Button>
							</div>
						</div>

						<Row className={`justify-content-center`}>
							<Col xs={12} sm={4} md={12} lg={4} className={'my-1'}>
								<Button variant="secondary" onClick={resetFn} type="button" className="w-100">
									Change Settings
								</Button>
							</Col>
							<Col xs={12} sm={4} md={12} lg={4} className={'my-1'}>
								<Button
									variant="warning"
									onClick={() => refreshFn(settings)}
									type="button"
									className="w-100">
									<FontAwesomeIcon icon={faArrowRotateRight} /> Get New Card
								</Button>
							</Col>
							<Col xs={12} sm={4} md={12} lg={4} className={'my-1'}>
								<Button
									variant="info"
									onClick={hintFn}
									type="button"
									className="w-100">
									Hint
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Quiz;
