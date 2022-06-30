import { FC } from 'react';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Form as BSForm, Button } from 'react-bootstrap';
import * as Yup from 'yup';

export interface SettingsValues {
	difficulty: string;
	generation: string;
	// timer: number;
	cardLimit: number;
	hasBeenSubmitted: boolean;
}

const SettingsSchema = Yup.object().shape({
	difficulty: Yup.string().required('Required'),
	generation: Yup.string().required('Required'),
	// timer: Yup.number().required('Required'),
	cardLimit: Yup.number().required('Required'),
});

interface SettingsProps {
	submitFn: (values: SettingsValues, actions: FormikHelpers<SettingsValues>) => void;
}

const generations = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
const difficulties = ['Easy', 'Moderate', 'Difficult'];

export const initialSettingsValues: SettingsValues = {
	difficulty: difficulties[0],
	generation: generations[0],
	// timer: 3,
	cardLimit: 5,
	hasBeenSubmitted: false,
};

const Settings: FC<SettingsProps> = ({ submitFn }) => {
	return (
		<Formik
			initialValues={initialSettingsValues}
			onSubmit={submitFn}
			validationSchema={SettingsSchema}
			enableReinitialize={true}>
			{() => (
				<Form className={'border border-dark rounded py-3 px-4 bg-light my-3'}>
					<h5 className="border-bottom pb-2 mb-2">Gym Settings</h5>
					<div className={''}>
						<BSForm.Group className="mb-3">
							<BSForm.Label htmlFor="difficulty">Difficulty</BSForm.Label>
							<Field
								id="difficulty"
								name="difficulty"
								placeholder="Pokemon difficulty"
								as={BSForm.Select}>
								{difficulties.map(gen => (
									<option key={gen} value={gen}>
										{gen}
									</option>
								))}
							</Field>
							<ErrorMessage name="difficulty" render={msg => <div className={''}>{msg}</div>} />
						</BSForm.Group>
						<BSForm.Group className="mb-3">
							<BSForm.Label htmlFor="generation">Pokemon Generation(s)</BSForm.Label>
							<Field
								id="generation"
								name="generation"
								placeholder="Pokemon generation"
								as={BSForm.Select}>
								{generations.map(gen => (
									<option key={gen} value={gen}>
										{gen}
									</option>
								))}
							</Field>
							<ErrorMessage name="generation" render={msg => <div className={''}>{msg}</div>} />
						</BSForm.Group>
						{/* <BSForm.Group className="mb-3">
							<BSForm.Label htmlFor="timer">Time Limit per Card (Seconds)</BSForm.Label>
							<Field
								id="timer"
								name="timer"
								placeholder="Time Limit"
								type="number"
								min="1"
								max="60"
								as={BSForm.Control}
							/>
							<Field
								id="timer"
								name="timer"
								placeholder="Time Limit"
								type="number"
								min="1"
								max="60"
								as={() => (
									<InputGroup>
										<BSForm.Control aria-label="Time Limit" aria-describedby="basic-addon2" />
										<InputGroup.Text id="basic-addon2">Seconds</InputGroup.Text>
									</InputGroup>
								)}
							/> 
							<ErrorMessage name="timer" render={msg => <div className={''}>{msg}</div>} />
						</BSForm.Group>*/}
						<BSForm.Group className="mb-3">
							<BSForm.Label htmlFor="cardLimit">Card Limit</BSForm.Label>
							<Field
								id="cardLimit"
								name="cardLimit"
								placeholder="Card Limit"
								type="number"
								min="1"
								max="60"
								as={BSForm.Control}
							/>
							<ErrorMessage name="cardLimit" render={msg => <div className={''}>{msg}</div>} />
						</BSForm.Group>
					</div>

					<div className="d-flex justify-content-center mt-4">
						<Button type="submit" variant="primary" className="w-50">
							Begin Training
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default Settings;
