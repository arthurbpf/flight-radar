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
	} = useForm<Airplane>();

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
					<Text>Ângulo</Text>
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
					<Text>Direção</Text>
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

interface ActionsFormParams {
	className?: string;
}

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
							Funções de transformação
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<Box margin="1em">
						<Box display="flex" gap="1em">
							<Box>
								<Box display="flex" gap="1em">
									<Box>
										<Text>X</Text>
										<Input type="number" step="any" />
									</Box>
									<Box>
										<Text>Y</Text>
										<Input type="number" step="any" />
									</Box>
								</Box>
								<Button marginTop="1em">Transladar</Button>
							</Box>
							<Box>
								<Box display="flex" gap="1em">
									<Box>
										<Text>X</Text>
										<Input type="number" step="any" />
									</Box>
									<Box>
										<Text>Y</Text>
										<Input type="number" step="any" />
									</Box>
								</Box>

								<Button marginTop="1em">Escalonar</Button>
							</Box>
						</Box>

						<Box margin="1em auto">
							<Text>Ângulo</Text>
							<Input type="number" step="any" />
							<Text>Centro de rotação</Text>
							<InputGroup>
								<InputLeftAddon>X</InputLeftAddon>
								<Input type="number" step="any" />
								<InputLeftAddon marginLeft="1em">Y</InputLeftAddon>
								<Input type="number" step="any" />
							</InputGroup>
							<Button marginTop="1em">Rotacionar</Button>
						</Box>
					</Box>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Funções de rastreamento
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Box margin="1em 0">
						<Text>Distância mínima</Text>
						<Input type="number" step="any" />
						<Button marginTop="1em">Aviões próximos ao aeroporto</Button>
					</Box>
					<Box margin="1em 0">
						<Text>Distância mínima</Text>
						<Input type="number" step="any" />
						<Button marginTop="1em">Aviões próximos</Button>
					</Box>
					<Box margin="1em 0">
						<Text>Tempo mínimo</Text>
						<Input type="number" step="any" />
						<Button marginTop="1em">Em rota de colisão</Button>
					</Box>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default ActionsForm;
