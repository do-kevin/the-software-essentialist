# Stats Calculator

## Problem Description

If the given input is `[2, 4, 21, -8, 53, 40]`

- Then it should be able to determine the mininum value such as -8,
- it can determine the maximum value in the array such as 53,
- count the number of elements in the array,
- and finally calculate the average value.

#### Find

What are the responsibilities of a Stats Calculator?

- Determine the minimum value in the array
- Determine the maximum value in the array
- Find the total number of items in the array
- Calculate the average value

#### Architect

What could be the shape of the data that gets consumed frontend to display the result to the user?

```
{
    mininum_value: -8,
    maximum_value: 53,
    num_of_elements: 6,
    average_value: 18.666666666667
}
```

#### Automate

Jest and Typescript scripts are already prepared in this starter template

#### Specify

- `it("should determine which number in the list is the minimum value")`
- `it("should determine which number in the list is the maximum value")`
- `it("should give back total number in the list")`
- `it("should determine the average value")`

#### Test

- Prepare my initial tests using what I've noted down in Architect section and Specify section
- Fake it to make my tests pass. It's like stubbing
- Incrementally create code first with obvious implementation and then litte feature by feature delivery

#### Refine

Refactor code. If it shows up at least 3 times, could be best time to refactor and also make it readable.
