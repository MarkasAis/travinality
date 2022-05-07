require 'rails_helper'

RSpec.describe "guides#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/v1/guides", payload
  end

  describe 'basic create' do
    let(:params) do
      attributes_for(:guide)
    end
    let(:payload) do
      {
        data: {
          type: 'guides',
          attributes: params
        }
      }
    end

    it 'works' do
      expect(GuideResource).to receive(:build).and_call_original
      expect {
        make_request
        expect(response.status).to eq(201), response.body
      }.to change { Guide.count }.by(1)
    end
  end
end
