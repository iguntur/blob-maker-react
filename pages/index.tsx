import Head from 'next/head';

function handleDownload() {
	const data = {
		guids: ['example-1', 'example-2'],
	};

	const csvdata = contentMaker(data);
	createDownloadBlob(csvdata);
}

function contentMaker(data: {guids: string[]}) {
	const rows: string[] = [];
	const headers = Object.keys(data);

	rows.push(headers.join(','));

	const values = Object.values(data.guids).join('\n');
	rows.push(values);

	return rows.join('\n');
}

function createDownloadBlob(data: string) {
	const blob = new Blob([data], {type: 'text/csv'});
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');

	a.setAttribute('href', url);
	a.setAttribute('download', 'bahaya.csv');
	a.click();
}

export default function Main() {
	return (
		<>
			<div
				style={{
					margin: '6rem auto',
					width: '400px',
					textAlign: 'center',
				}}>
				<button style={{width: '12rem', height: '2rem'}} onClick={handleDownload}>
					Download
				</button>
			</div>
		</>
	);
}
