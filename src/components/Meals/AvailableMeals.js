import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])

    useEffect(() => {
        const requestData = async () => {
            const response = await fetch('https://react-food-ordering-ff3f4-default-rtdb.firebaseio.com/meals.json')
            const responseData = await response.json();

            const defaultFood = [];
            console.log(responseData)
            for (const key in responseData) {
                defaultFood.push(
                    {
                        id : key,
                        name : responseData[key].name,
                        description : responseData[key].description,
                        price : responseData[key].price,
                    }
                );
            }
            setMeals(defaultFood)
        }
    requestData()

    }, [])



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
