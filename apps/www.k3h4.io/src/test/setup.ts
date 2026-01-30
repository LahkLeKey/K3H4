import "@testing-library/jest-dom";

if (!window.URL.createObjectURL) {
	window.URL.createObjectURL = () => "";
}

if (!window.URL.revokeObjectURL) {
	window.URL.revokeObjectURL = () => undefined;
}
