This file contains a collection of the specific prompts and instructions used to build the Work Order Timeline application. These patterns can be reused for similar development tasks.

## 1. Visual Refinement & Layout
**Goal:** Achieve a cleaner, clearer timeline view.
> "Refine the visual presentation by removing all horizontal grid lines to create a spacious, modern look. Instead, add subtle vertical grid lines (low opacity) to mark the days. Ensure the 'Today' indicator renders on top of the grid but behind the work order bars."

## 2. Data Engineering
**Goal:** Create realistic test data for development.
> "Update the sample data to be more realistic. Redistribute all work orders to span the range of January to September 2026."

## 3. Advanced Form Validation
**Goal:** Implement robust cross-field validation in a reactive form.
> "Add validation to the side panel form. Specifically, implement a `dateRangeValidator` that prevents saving if the End Date is before the Start Date. Also, enforce a required check for the 'Work Order Name' field and display a prominent error if the selected dates overlap with an existing order."

## 4. CSS Architecture & Component Fixing
**Goal:** Fix a broken third-party component (Datepicker) without full library styles.
> "The datepicker header is missing because we aren't using the full Bootstrap framework. Create a 'Bootstrap-Lite' CSS configuration that explicitly forces the datepicker navigation into a flex-column layout."
