

export function compareOutputs(userOutput, savedOutput) {
    const decodedUserOutput = userOutput ? atob(userOutput) : null;

    const decodedSavedOutput = savedOutput ? atob(savedOutput) : null;

    return decodedUserOutput === decodedSavedOutput;
}