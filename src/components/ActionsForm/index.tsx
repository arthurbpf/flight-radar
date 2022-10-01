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

const InputForm = () => {
	const addAirplane = useAirplanesStore((state) => state.addAirplane);

	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful }
	} = useForm<Airplane>();

	const onSubmit = (data: Airplane) => {
		addAirplane(data);
	};

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
					<Input {...register('x')} />
				</Box>
				<Box>
					<Text>Y</Text>
					<Input {...register('y')} />
				</Box>
				<Box>
					<Text>Raio</Text>
					<Input {...register('radius')} />
				</Box>
				<Box>
					<Text>Ângulo</Text>
					<Input {...register('angle')} />
				</Box>
				<Box>
					<Text>Velocidade</Text>
					<Input {...register('speed')} />
				</Box>
				<Box>
					<Text>Direção</Text>
					<Input {...register('direction')} />
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
										<Input />
									</Box>
									<Box>
										<Text>Y</Text>
										<Input />
									</Box>
								</Box>
								<Button marginTop="1em">Transladar</Button>
							</Box>
							<Box>
								<Box display="flex" gap="1em">
									<Box>
										<Text>X</Text>
										<Input />
									</Box>
									<Box>
										<Text>Y</Text>
										<Input />
									</Box>
								</Box>

								<Button marginTop="1em">Escalonar</Button>
							</Box>
						</Box>

						<Box margin="1em auto">
							<Text>Ângulo</Text>
							<Input />
							<Text>Centro de rotação</Text>
							<InputGroup>
								<InputLeftAddon>X</InputLeftAddon>
								<Input />
								<InputLeftAddon marginLeft="1em">Y</InputLeftAddon>
								<Input />
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
						<Input />
						<Button marginTop="1em">Aviões próximos ao aeroporto</Button>
					</Box>
					<Box margin="1em 0">
						<Text>Distância mínima</Text>
						<Input />
						<Button marginTop="1em">Aviões próximos</Button>
					</Box>
					<Box margin="1em 0">
						<Text>Tempo mínimo</Text>
						<Input />
						<Button marginTop="1em">Em rota de colisão</Button>
					</Box>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default ActionsForm;
