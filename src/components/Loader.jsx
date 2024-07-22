import { Html, useProgress } from '@react-three/drei';

export function Loader() {
	const { progress } = useProgress();
	return (
		<Html center className='loader-container'>
			<div className='loader'>
				<div className='spinner'></div>
				<p className='loading-text'>Loading {progress.toFixed(0)}%</p>
			</div>
		</Html>
	);
}
