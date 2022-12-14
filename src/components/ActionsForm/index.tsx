import styles from './index.module.scss';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Input,
	InputGroup,
	Text,
	Button,
	InputLeftAddon
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Airplane from '../../types/Airplane';
import useAirplanesStore from '../../stores/airplanesStore';
import {
	convertToCartesian,
	convertToPolar
} from '../../utils/coordinateConversion';
import { rotate, scale, translate } from '../../utils/transformationFunctions';
import { collisionRoute } from '../../utils/collisionRoute';
import {
	getAirplanesNextToAirport,
	getNextPlanes
} from '../../utils/distances';

const InputForm = () => {
	const addAirplane = useAirplanesStore((state) => state.addAirplane);
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
		getValues,
		setValue
	} = useForm<Airplane>({
		defaultValues: { x: 0, y: 0, angle: 0, direction: 0, radius: 0, speed: 0 }
	});

	const onSubmit = (data: Airplane) => {
		addAirplane(data);
	};

	const handleCartesianChanges = (args: { x?: number; y?: number }) => {
		const formData = { ...getValues(), ...args };

		const { radius, angle } = convertToPolar(formData.x, formData.y);

		setValue('radius', radius);
		setValue('angle', angle);
	};

	const handlePolarChanges = (args: { radius?: number; angle?: number }) => {
		const formData = { ...getValues(), ...args };

		const { x, y } = convertToCartesian(formData.radius, formData.angle);

		setValue('x', x);
		setValue('y', y);
	};

	// resets form after submission
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box display="grid" gridTemplateColumns="50% 50%" gridGap=".5em">
				<Box>
					<Text>X</Text>
					<Input
						type="number"
						step="any"
						{...register('x', { valueAsNumber: true })}
						onChange={(event) =>
							handleCartesianChanges({ x: event.target.valueAsNumber })
						}
					/>
				</Box>
				<Box>
					<Text>Y</Text>
					<Input
						type="number"
						step="any"
						{...register('y', { valueAsNumber: true })}
						onChange={(event) =>
							handleCartesianChanges({ y: event.target.valueAsNumber })
						}
					/>
				</Box>
				<Box>
					<Text>Raio</Text>
					<Input
						type="number"
						step="any"
						{...register('radius', { valueAsNumber: true })}
						onChange={(event) =>
							handlePolarChanges({ radius: event.target.valueAsNumber })
						}
					/>
				</Box>
				<Box>
					<Text>??ngulo</Text>
					<Input
						type="number"
						step="any"
						{...register('angle', { valueAsNumber: true })}
						onChange={(event) =>
							handlePolarChanges({ angle: event.target.valueAsNumber })
						}
					/>
				</Box>
				<Box>
					<Text>Velocidade</Text>
					<Input
						type="number"
						step="any"
						{...register('speed', { valueAsNumber: true })}
					/>
				</Box>
				<Box>
					<Text>Dire????o</Text>
					<Input
						type="number"
						step="any"
						{...register('direction', { valueAsNumber: true })}
					/>
				</Box>
			</Box>

			<Button margin="1em auto" type="submit">
				Inserir
			</Button>
		</form>
	);
};

const TransformationForm = () => {
	interface TranslateFormData {
		x: number;
		y: number;
	}

	const TranslateForm = () => {
		const airplanes = useAirplanesStore((state) => state.airplanes);
		const selection = useAirplanesStore((state) => state.selection);
		const setAirplanes = useAirplanesStore((state) => state.setAirplanes);

		const {
			register,
			handleSubmit,
			reset,
			formState,
			formState: { isSubmitSuccessful }
		} = useForm<TranslateFormData>({ defaultValues: { x: 0, y: 0 } });

		const onSubmit = (data: TranslateFormData) => {
			const newAirplanes = airplanes.map((airplane) => {
				if (selection.includes(airplane.id)) {
					return translate(airplane, data.x, data.y);
				}

				return airplane;
			});

			setAirplanes(newAirplanes);
		};

		useEffect(() => {
			if (isSubmitSuccessful) {
				reset();
			}
		}, [formState, reset]);

		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<Box display="flex" gap="1em">
						<Box>
							<Text>X</Text>
							<Input
								type="number"
								step="any"
								{...register('x', { valueAsNumber: true })}
							/>
						</Box>
						<Box>
							<Text>Y</Text>
							<Input
								type="number"
								step="any"
								{...register('y', { valueAsNumber: true })}
							/>
						</Box>
					</Box>
					<Button margin="1em auto" type="submit">
						Transladar
					</Button>
				</Box>
			</form>
		);
	};

	const ScaleForm = () => {
		const airplanes = useAirplanesStore((state) => state.airplanes);
		const selection = useAirplanesStore((state) => state.selection);
		const setAirplanes = useAirplanesStore((state) => state.setAirplanes);

		const {
			register,
			handleSubmit,
			reset,
			formState,
			formState: { isSubmitSuccessful }
		} = useForm<TranslateFormData>({ defaultValues: { x: 0, y: 0 } });

		const onSubmit = (data: TranslateFormData) => {
			const newAirplanes = airplanes.map((airplane) => {
				if (selection.includes(airplane.id)) {
					return scale(airplane, data.x, data.y);
				}

				return airplane;
			});

			setAirplanes(newAirplanes);
		};

		useEffect(() => {
			if (isSubmitSuccessful) {
				reset();
			}
		}, [formState, reset]);

		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<Box display="flex" gap="1em">
						<Box>
							<Text>X</Text>
							<Input
								type="number"
								step="any"
								{...register('x', { valueAsNumber: true })}
							/>
						</Box>
						<Box>
							<Text>Y</Text>
							<Input
								type="number"
								step="any"
								{...register('y', { valueAsNumber: true })}
							/>
						</Box>
					</Box>

					<Button marginTop="1em" type="submit">
						Escalonar
					</Button>
				</Box>
			</form>
		);
	};

	interface RotateFormData {
		angle: number;
		x: number;
		y: number;
	}

	const RotateForm = () => {
		const airplanes = useAirplanesStore((state) => state.airplanes);
		const selection = useAirplanesStore((state) => state.selection);
		const setAirplanes = useAirplanesStore((state) => state.setAirplanes);

		const {
			register,
			handleSubmit,
			reset,
			formState,
			formState: { isSubmitSuccessful }
		} = useForm<RotateFormData>({ defaultValues: { angle: 0, x: 0, y: 0 } });

		const onSubmit = (data: RotateFormData) => {
			const newAirplanes = airplanes.map((airplane) => {
				if (selection.includes(airplane.id)) {
					return rotate(airplane, data.angle, data.x, data.y);
				}

				return airplane;
			});

			setAirplanes(newAirplanes);
		};

		useEffect(() => {
			if (isSubmitSuccessful) {
				reset();
			}
		}, [formState, reset]);

		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box margin="1em auto">
					<Text>??ngulo</Text>
					<Input
						type="number"
						step="any"
						{...register('angle', { valueAsNumber: true })}
					/>
					<Text>Centro de rota????o</Text>
					<InputGroup>
						<InputLeftAddon>X</InputLeftAddon>
						<Input
							type="number"
							step="any"
							{...register('x', { valueAsNumber: true })}
						/>

						<InputLeftAddon marginLeft="1em">Y</InputLeftAddon>
						<Input
							type="number"
							step="any"
							{...register('y', { valueAsNumber: true })}
						/>
					</InputGroup>
					<Button marginTop="1em" type="submit">
						Rotacionar
					</Button>
				</Box>
			</form>
		);
	};

	return (
		<Box margin="1em">
			<Box display="flex" gap="1em">
				<TranslateForm />
				<ScaleForm />
			</Box>

			<RotateForm />
		</Box>
	);
};

interface ActionsFormParams {
	className?: string;
}

interface CollisionFormData {
	time: number;
}

interface DistanceFormData {
	distance: number;
}

const DistanceToAirportForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful }
	} = useForm<DistanceFormData>({ defaultValues: { distance: 0 } });

	const onSubmit = (data: DistanceFormData) => {
		getAirplanesNextToAirport(data.distance);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box margin="1em 0">
				<Text>Dist??ncia m??nima</Text>
				<Input
					type="number"
					step="any"
					{...register('distance', { valueAsNumber: true })}
				/>
				<Button marginTop="1em" type="submit">
					Avi??es pr??ximos ao aeroporto
				</Button>
			</Box>
		</form>
	);
};

const NextAirplanesForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful }
	} = useForm<DistanceFormData>({ defaultValues: { distance: 0 } });

	const onSubmit = (data: DistanceFormData) => {
		getNextPlanes(data.distance);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box margin="1em 0">
				<Text>Dist??ncia m??nima</Text>
				<Input
					type="number"
					step="any"
					{...register('distance', { valueAsNumber: true })}
				/>
				<Button marginTop="1em" type="submit">
					Avi??es pr??ximos
				</Button>
			</Box>
		</form>
	);
};

const AirplanesInCollisionRouteForm = () => {
	const airplanes = useAirplanesStore((state) => state.airplanes);

	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful }
	} = useForm<CollisionFormData>({ defaultValues: { time: 0 } });

	const onSubmit = (data: CollisionFormData) => {
		collisionRoute(data.time);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box margin="1em 0">
				<Text>Tempo m??nimo</Text>
				<Input
					type="number"
					step="any"
					{...register('time', { valueAsNumber: true })}
				/>
				<Button marginTop="1em" type="submit">
					Em rota de colis??o
				</Button>
			</Box>
		</form>
	);
};

const ActionsForm = (params: ActionsFormParams) => {
	return (
		<Accordion
			className={`${styles.expandAll} ${params.className || ''}`}
			defaultIndex={[0]}
			allowMultiple={false}
		>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Entrada de dados
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4} display="flex" flexDir="column">
					<InputForm />
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Fun????es de transforma????o
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<TransformationForm />
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Fun????es de rastreamento
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<DistanceToAirportForm />
					<NextAirplanesForm />
					<AirplanesInCollisionRouteForm />
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default ActionsForm;
