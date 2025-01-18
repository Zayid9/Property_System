#!/bin/bash

# Simple Interest Calculator
echo "Enter principal amount:"
read principal
echo "Enter rate of interest:"
read rate
echo "Enter time (in years):"
read time

# Calculate simple interest
interest=$(echo "$principal * $rate * $time / 100" | bc -l)
echo "Simple Interest: $interest"
