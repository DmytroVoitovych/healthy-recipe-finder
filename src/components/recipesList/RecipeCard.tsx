import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Image from "next/image";
import Link from "next/link";

export const RecipeCard = ({recipe}:{recipe:Recipe}) => { 

 return  <li>
    <article>
      <section>
     <Image alt={recipe.recipe_name + 'healthy recipe'} src={recipe.recipe_image} width="360" height="300"/>
     <h1></h1>
        <p></p>
       <Link href=""></Link>
     </section>  
    </article>
 </li>   
};  