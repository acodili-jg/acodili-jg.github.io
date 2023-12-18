use rocket::get;
use rocket_dyn_templates::{context, Template};
use std::path::PathBuf;

#[get("/<path..>", rank = 11)]
pub fn index(path: PathBuf) -> Option<Template> {
    match path.to_str() {
        Some("" | "index.html") => Some(Template::render(
            "unstable/index",
            context! { version: "unstable" },
        )),
        _ => None,
    }
}
