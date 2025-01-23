function roundGrade(grade) {
    if (grade < 48 || grade % 5 === 0) {
        return grade;
    }
    const nextMultipleOf5 = Math.ceil(grade / 5) * 5;
    if (nextMultipleOf5 - grade < 3) {
        return nextMultipleOf5;
    }
    return grade;
}

document.write(roundGrade(53));

