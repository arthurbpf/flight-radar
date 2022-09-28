import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';

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

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Accordion defaultIndex={[0]} allowMultiple={true}>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Entrada de dados
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel
						pb={4}
						display="flex"
						flexDir="column"
						className={styles.growAll}
					>
						<Box
							width="100%"
							display="grid"
							gridTemplateColumns="auto auto"
							gridGap=".5em"
						>
							<Box>
								<Text>X</Text>
								<Input />
							</Box>
							<Box>
								<Text>Y</Text>
								<Input />
							</Box>
							<Box>
								<Text>Raio</Text>
								<Input />
							</Box>
							<Box>
								<Text>Ângulo</Text>
								<Input />
							</Box>
							<Box>
								<Text>Velocidade</Text>
								<Input />
							</Box>
							<Box>
								<Text>Direção</Text>
								<Input />
							</Box>
						</Box>

						<Button margin="1em auto" maxWidth="500px">
							Inserir
						</Button>
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
							<Box className={styles.growAll} display="flex" gap="1em">
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

							<Box
								margin="1em auto"
								minWidth="300px"
								maxWidth="50%"
								className={styles.growAll}
							>
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
					<AccordionPanel pb={4}></AccordionPanel>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default Home;
