
export const formatNumber = (number) => {
    const symbols = ["", "k", "M", "G", "T", "P", "E"];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    const suffix = symbols[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(0) + suffix;
};

export const formatCurrency = (number) => {
    const symbols = ["", "k", "M", "G", "T", "P", "E"];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    const suffix = symbols[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(1) + suffix;
};