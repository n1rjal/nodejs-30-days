# Expense tracker app

> A simple tracker app that will track user's expense
> Users should be able to CRUD expense list

## Model

The model and Schema that I will be in use for the app will have following

<pre>

|ExepenseModel
    |-> ExpenseSchema
        |-> Title
            |-> Type => String
            |-> Required => True
        |-> Spent
            |-> Type => Integer
            |-> Required => True
            |-> Value >= 0
        |-> Info
            |-> Type => String // MarkDown
            |-> Required => False

</pre>

## Workflow

Users will add **their expense** throught form and our backend will Validate the data being recieved and if valid. The entry will be entered.<br>


