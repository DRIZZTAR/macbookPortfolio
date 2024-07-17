import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import Experience from './Experience.jsx';

const Loader = () => {
	const { progress } = useProgress();
	return (
		<Html center className='loader-container'>
			<div className='loader'>
				<div className='spinner'></div>
				<p className='loading-text'>Loading {progress.toFixed(0)}%</p>
			</div>
		</Html>
	);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
	<Canvas
		className='r3f'
		camera={{
			fov: 45,
			near: 0.1,
			far: 2000,
			position: [-3, 1.5, 4],
		}}
	>
		<Suspense fallback={<Loader />}>
			<Experience />
		</Suspense>
	</Canvas>
);
