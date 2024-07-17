// Code to render the 3D model of the MacBook and the website in the screen
import {
	Float,
	useGLTF,
	Environment,
	PresentationControls,
	ContactShadows,
	Html,
	Text,
	Stars,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import ReflectiveTriangles from './components/ExtrudedTriangle';

export default function Experience() {
	const computer = useGLTF(
		'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
	);

	return (
		<>
			{/* <Perf openByDefault trackGPU={true} position='top-left' /> */}
			<Environment  preset='forest' backgroundBlurriness={0.14}/>
			<ReflectiveTriangles count={500} size={2.5} />
			<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
			<ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />

			<PresentationControls
				global
				rotation={[0.13, 0.1, 0]}
				polar={[-0.4, 0.2]}
				azimuth={[-1, 0.75]}
				config={{ mass: 2, tension: 400 }}
				snap={{ mass: 4, tension: 400 }}
			>
				<Float rotationIntensity={0.4}>
					<rectAreaLight
						intensity={65}
						width={2.5}
						height={1.65}
						color='#ff99ff'
						position={[0, 0.55, -1.55]}
						rotation={[0.1, Math.PI, 0]}
					/>

					<primitive object={computer.scene} position-y={-1.2}>
						<Html
							transform
							wrapperClass='htmlScreen'
							distanceFactor={1.17}
							position={[0, 1.56, -1.4]}
							rotation-x={-0.256}
						>
							<iframe src='https://www.tysonskakun.dev' />
						</Html>
					</primitive>

					<Text
						font='./raleway.woff'
						color={'#dddddd'}
						fontSize={0.5}
						position={[2, 0.75, 0.75]}
						rotation-y={-1.25}
						maxWidth={2.0}
						textAlign='center'
					>
						Tyson Skakun
					</Text>
				</Float>
			</PresentationControls>
		</>
	);
}
