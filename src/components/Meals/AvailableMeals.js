import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(null);

    useEffect(() => {
        setErr(null);
        setIsLoading(true);
        const requestData = async () => {

            const response = await fetch('https://react-food-ordering-ff3f4-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseData = await response.json();

            const defaultFood = [];
            console.log(responseData)
            for (const key in responseData) {
                defaultFood.push(
                    {
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                    }
                );
            }
            setMeals(defaultFood);
            setIsLoading(false);
        }
        requestData().catch((error) => {
            setErr(error.message)
            setIsLoading(false)
        })

    }, [])

    if (isLoading) {
        return <section className={classes.loading}>
            <p> Loading... </p>
        </section>
    }

    if (err) {
        return <section className={classes.error}>
            <p>{err}</p>
        </section>
    }

    const mealsList = meals.map((meal) =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>

    );
};

export default AvailableMeals;
