<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\Category;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userCategoryIds = $request->user()->categories()->pluck('id');
        $todos = Todo::whereIn('category_id', $userCategoryIds)->with('category')->get();
        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        // Verify the category belongs to the authenticated user
        $category = Category::find($fields['category_id']);
        if ($category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $todo = Todo::create($fields);
        return response()->json($todo->load('category'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        if ($todo->category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        return response()->json($todo->load('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        if ($todo->category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
            'category_id' => 'sometimes|required|exists:categories,id'
        ]);

        // If updating category, verify it belongs to user
        if (isset($fields['category_id'])) {
            $category = Category::find($fields['category_id']);
            if ($category->user_id !== auth()->id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        $todo->update($fields);
        return response()->json($todo->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        if ($todo->category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $todo->delete();
        return response()->json(['message' => 'Todo deleted']);
    }
}
