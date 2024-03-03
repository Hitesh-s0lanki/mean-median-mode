export type mean_result = {
    class: number[][],
    frequency: number[],
    x: number[],
    x_f: number[];
    x_x_f: number[];
    x_mean_x: number[],
    f_x_mean_x: number[],
    mean: number,
    mean_deviation: number,
    standard_deviation: number,
    coeff_mean_deviation: number,
    coeff_standard_deviation: number,
}

export type mode_result = {
    class: number[][],
    frequency: number[],
    x: number[],
    marker: string[],
    mode: number
}

export type median_result = {
    class: number[][],
    frequency: number[],
    x: number[],
    c_frequency: number[],
    marker: string[],
    median: number
}

export type moment_group = {
    f_x_a: number[],
    f_x_a_2: number[],
    f_x_a_3: number[],
    f_x_a_4: number[],
    mean_result: mean_result,
    median_result: median_result,
    mode_result: mode_result,
    first_moment: number,
    second_moment: number,
    third_moment: number,
    fourt_moment: number,
    skewness_using_median: number,
    skewness_using_mode: number,
    kurtosis_beta: number,
    kurtosis_alpha: number,
    kurtosis_result: "laptokurtic" | "mesokurtic" | "platykurtic",
}

export type moment_ungroup = {
    x_a: number[],
    x_a_2: number[],
    x_a_3: number[],
    x_a_4: number[],
    mean_result: number,
    median_result: number,
    mode_result: number,
    standard_deviation: number,
    first_moment: number,
    second_moment: number,
    third_moment: number,
    fourt_moment: number,
    skewness_using_median: number,
    skewness_using_mode: number,
    kurtosis_beta: number,
    kurtosis_alpha: number,
    kurtosis_result: "laptokurtic" | "mesokurtic" | "platykurtic",
}

