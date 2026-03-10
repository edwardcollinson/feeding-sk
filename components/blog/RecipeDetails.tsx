interface Ingredient {
  name: string;
  amount?: string;
  unit?: string;
  notes?: string;
}

interface RecipeDetailsProps {
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: Ingredient[];
}

export default function RecipeDetails({
  prepTime,
  cookTime,
  servings,
  ingredients,
}: RecipeDetailsProps) {
  const totalTime = (prepTime || 0) + (cookTime || 0);

  return (
    <div className="bg-emerald/5 rounded-2xl p-6 mb-8">
      {/* Time & servings bar */}
      <div className="flex flex-wrap gap-6 mb-6 text-sm">
        {prepTime && (
          <div>
            <span className="font-semibold text-evergreen">Prep:</span>{" "}
            <span className="text-evergreen/70">{prepTime} min</span>
          </div>
        )}
        {cookTime && (
          <div>
            <span className="font-semibold text-evergreen">Cook:</span>{" "}
            <span className="text-evergreen/70">{cookTime} min</span>
          </div>
        )}
        {totalTime > 0 && (
          <div>
            <span className="font-semibold text-evergreen">Total:</span>{" "}
            <span className="text-evergreen/70">{totalTime} min</span>
          </div>
        )}
        {servings && (
          <div>
            <span className="font-semibold text-evergreen">Servings:</span>{" "}
            <span className="text-evergreen/70">{servings}</span>
          </div>
        )}
      </div>

      {/* Ingredients */}
      {ingredients && ingredients.length > 0 && (
        <div>
          <h3 className="font-heading text-xl mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                <span>
                  {ing.amount && (
                    <span className="font-medium">
                      {ing.amount}
                      {ing.unit ? ` ${ing.unit}` : ""}{" "}
                    </span>
                  )}
                  {ing.name}
                  {ing.notes && (
                    <span className="text-evergreen/50"> ({ing.notes})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
