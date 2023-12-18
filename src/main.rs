use acodili_jg_html::unstable;
use rocket::{fs::FileServer, get, launch, response::Redirect, routes};
use rocket_dyn_templates::Template;
use std::path::PathBuf;

#[get("/<path..>", rank = 12)]
fn redirect(path: PathBuf) -> Option<Redirect> {
    Some(path)
        .filter(|path| !path.starts_with("stable"))
        .map(|path| Redirect::to(format!("/stable/{}", path.display())))
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", FileServer::from("static/"))
        .mount("/stable/", FileServer::from("static/0.1.0/").rank(0))
        .mount("/unstable/", routes![unstable::index])
        .mount("/", routes![redirect])
        .attach(Template::fairing())
}
