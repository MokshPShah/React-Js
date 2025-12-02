import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import p1 from '../assets/images/testimonial/p1.png'
import p2 from '../assets/images/testimonial/p2.png'

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Karen onnabit",
      role: "Store customer",
      rating: 4,
      comments: "If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text generator on the internet dictionary of over.",
      img: `${p1}`,
    },
    {
      name: "Lynne gwistic",
      role: "Store customer",
      rating: 4,
      comments:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange was in the 1960s with the release of containing passages.",
      img: `${p2}`,
    },
  ];

  return (
    <Container fluid className="py-5 bg-light">
      <Container className="text-center">

        {/* Heading */}
        <p className="text-primary fw-semibold">1300+ Customer reviews</p>
        <h2 className="fw-bold mb-5">Our customer love</h2>

        <Row className="justify-content-center align-items-center">

          <Col md={1} className="d-flex justify-content-center">
            <div className="nav-arrow">
              <ChevronLeft size={20} />
            </div>
          </Col>

          <Col md={10}>
            <Row className="g-5 justify-content-center">
              {testimonials.map((item, idx) => (
                <Col key={idx} md={5}>
                  <div className="testimonial-box p-4 pt-5 bg-white text-center">

                    <img
                      src={item.img}
                      alt={item.name}
                      className="rounded-circle mb-3"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />

                    <div className="d-flex justify-content-center align-items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          strokeWidth={2}
                          color={i < item.rating ? "#6a1bff" : "#ccc"}
                          fill={i < item.rating ? "#6a1bff" : "none"}
                          style={{ marginRight: "4px" }}
                        />
                      ))}
                      <span className="ms-2 text-muted small">/ 01 Comment</span>
                    </div>

                    <p className="text-muted small px-2 mb-4">{item.comments}</p>
                    <div className="d-flex justify-content-center">
                      <Quote size={30} color="#6a1bff" />
                    </div>

                    <h6 className="fw-bold mt-3">{item.name}</h6>
                    <p className="text-muted small">{item.role}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <div className="nav-arrow">
              <ChevronRight size={20} />
            </div>
          </Col>

        </Row>
      </Container>
    </Container>
  );
};

export default TestimonialSection;
